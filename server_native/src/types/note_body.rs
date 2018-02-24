extern crate rocket;
use std::collections::HashMap;
use rocket::data::FromData;
use super::super::models::note::Note;

#[derive(Deserialize)]
pub struct NoteBody {
  pub params: Note
}
