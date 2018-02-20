use rocket_contrib::{Json, Value};
use super::super::types::single_value_body::SingleValueBody;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_day(data: Json<Option<SingleValueBody>>) -> Json<super::super::models::day::Day> {
  Json(sql::get_day(data.0.unwrap().params.parse::<i64>().unwrap()))
}
