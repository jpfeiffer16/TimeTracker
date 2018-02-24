use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::models::note::Note;
use super::super::sql;
use super::super::types::single_value_body::SingleValueBody;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_note(data: Json<Option<SingleValueBody>>) -> Json<Note> {
  Json(
    match sql::get_note(data.0.unwrap().params) {
      Ok(note) => note,
      Err(Error) => Note {
        id: None,
        title: None,
        text: None
      }
    }
  )
}
