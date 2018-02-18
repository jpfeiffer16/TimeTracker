// #[macro_use]
extern crate rocket;
use std::collections::HashMap;
use rocket::data::FromData;

#[derive(Deserialize)]
pub struct Body  {
  pub params: HashMap<String, String>
}