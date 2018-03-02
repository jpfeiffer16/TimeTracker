// #[macro_use]
extern crate rocket;
use std::collections::HashMap;
use rocket::data::FromData;

#[derive(Deserialize)]
pub struct Body {
  pub db: String,
  pub params: Option<HashMap<String, String>>,
}
