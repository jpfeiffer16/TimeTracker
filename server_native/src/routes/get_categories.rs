use rusqlite::Connection;
use rocket_contrib::{Json, Value};
use super::super::models::category::Category;
use super::super::sql;
use rusqlite::Error;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_categories(data: Json<Option<SingleValueBody>>) -> Result<Json<Vec<Category>>, Json<Error>> {
  
  match sql::get_categories(data.0.unwrap().db) {
    Ok(categories) => Ok(Json(categories)),
    Err(err) => Err(Json(err))
  }
}
