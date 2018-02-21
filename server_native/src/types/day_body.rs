// #[macro_use]
extern crate rocket;
use std::collections::HashMap;
use rocket::data::FromData;
use super::super::models::day::Day;

#[derive(Deserialize)]
pub struct DayBody {
  pub params: Day
}
