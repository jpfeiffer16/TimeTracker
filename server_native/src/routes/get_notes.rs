use rusqlite::Connection;
use rocket_contrib::{Json, Value};
use super::super::models::note::Note;
use super::super::sql;

#[post("/", format = "application/json")]
pub fn get_notes() -> Json<Vec<Note>> {
  Json(sql::get_notes())
}
