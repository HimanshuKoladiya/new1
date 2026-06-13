provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

resource "google_sql_database_instance" "postgres" {
  name             = "zenith-db"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }
}

resource "google_cloud_run_service" "backend" {
  name     = "zenith-backend"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/zenith-backend:latest"
        env {
          name  = "SQLALCHEMY_DATABASE_URI"
          value = "postgresql+asyncpg://..." # Set actual connection string
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
