use rusqlite::Connection;
use rocket_contrib::{Json, Value};
use super::super::models::note::Note;
use super::super::sql;
use super::super::types::data::Data;

#[post("/", format = "application/json", data="<data>")]
pub fn get_notes(data: Json<Data<Option<i64>>>) -> Json<Vec<Note>> {
  Json(sql::get_notes(&data.0.db))
}
