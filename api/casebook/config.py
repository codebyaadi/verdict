from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgres://casebook:casebook@localhost:5432/casebook"
    # Shared with the web app: Better Auth signs session cookies with this.
    better_auth_secret: str = ""


settings = Settings()
