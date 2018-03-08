use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::models::note::Note;
use super::super::sql;
use super::super::types::single_value_body::SingleValueBody;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_note(data: Json<Option<SingleValueBody>>) -> Json<Note> {
  let body_data = data.0.unwrap();
  Json(
    match sql::get_note(body_data.params, &body_data.db) {
      Ok(note) => note,
      Err(Error) => Note {
        id: None,
        title: None,
        text: None,
        created_at: None,
        updated_at: None
      }
    }
  )
}
