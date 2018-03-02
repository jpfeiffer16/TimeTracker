// #[macro_use]
extern crate rocket;
use std::collections::HashMap;
use rocket::data::FromData;

#[derive(Deserialize)]
pub struct SingleValueBody {
  pub db: String,
  pub params: i64
}
