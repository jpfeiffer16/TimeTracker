use rusqlite::Connection;
use rocket_contrib::{Json, Value};
use super::super::models::category::Category;
use super::super::sql;
use rusqlite::Error;

#[post("/", format = "application/json")]
pub fn get_categories() -> Result<Json<Vec<Category>>, Json<Error>> {
  
  match sql::get_categories() {
    Ok(categories) => Ok(Json(categories)),
    Err(err) => Err(Json(err))
  }
}
