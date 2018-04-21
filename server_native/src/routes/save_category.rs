use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::models::category::Category;
use super::super::sql;
use super::super::types::body::Body;
use super::super::types::data::Data;

#[post("/", format = "application/json", data = "<data>")]
pub fn save_category(data: Json<Data<Option<Category>>>) -> Json<Category> {
  let body_data = data.0;
  let id = sql::save_category(body_data.params.unwrap(), &body_data.db).unwrap();
  Json(match sql::get_category(id, &body_data.db) {
    Ok(category) => category,
    Err(err) => Category {
      id: None,
      name: None,
      created_at: None,
      updated_at: None
    }
  })
}