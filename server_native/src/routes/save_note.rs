use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::models::note::Note;
use super::super::sql;
use super::super::types::note_body::NoteBody;

#[post("/", format = "application/json", data = "<data>")]
pub fn save_note(data: Json<Option<NoteBody>>) -> Json<Note> {
  let body_data = data.0.unwrap();
  let id = sql::save_note(body_data.params, &body_data.db).unwrap();
  Json(match sql::get_note(id, &body_data.db) {
    Ok(note) => note,
    Err(err) => Note {
      id: None,
      title: None,
      text: None,
      created_at: None,
      updated_at: None
    }
  })
}
