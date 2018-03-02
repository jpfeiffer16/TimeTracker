extern crate rocket;
use std::collections::HashMap;
use rocket::data::FromData;
use super::super::models::note::Note;

#[derive(Deserialize)]
pub struct NoteBody {
  pub db: String,
  pub params: Note
}
