use rusqlite::Connection;
use rocket_contrib::{Json, Value};
use super::super::models::category::Category;
use super::super::sql;
use super::super::types::single_value_body::SingleValueBody;
use rusqlite::Error;

#[post("/", format = "application/json", data="<data>")]
pub fn get_category(data: Json<Option<SingleValueBody>>) -> Result<Json<Category>, Json<Error>> {
  let body_data = data.0.unwrap();
  match sql::get_category(body_data.params, &body_data.db) {
    Ok(category) => Ok(Json(category)),
    Err(err) => Err(Json(err))
  }
}
