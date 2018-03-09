use rusqlite::Connection;
use rocket_contrib::{Json, Value};
use super::super::models::category::Category;
use super::super::sql;
use super::super::types::data::Data;
use rusqlite::Error;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_categories(data: Json<Data<Option<()>>>) -> Result<Json<Vec<Category>>, Json<Error>> {
  
  match sql::get_categories(&data.0.db) {
    Ok(categories) => Ok(Json(categories)),
    Err(err) => Err(Json(err))
  }
}
