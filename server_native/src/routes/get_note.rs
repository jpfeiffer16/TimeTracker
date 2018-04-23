use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::models::note::Note;
use super::super::sql;
use super::super::types::data::Data;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_note(data: Json<Data<Option<i64>>>) -> Json<Note> {
  let body_data = data.0;
  Json(
    match sql::get_note(body_data.params.unwrap(), &body_data.db) {
      Ok(note) => note,
      Err(Error) => Note {
        id: None,
        title: None,
        text: None,
        created_at: None,
        updated_at: None,
        category_id: None
      }
    }
  )
}
