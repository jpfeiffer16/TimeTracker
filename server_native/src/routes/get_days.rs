use rocket_contrib::{Json, Value};
use super::super::types::body::Body;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_days(data: Json<Option<Body>>) -> Json<Vec<super::super::models::day::Day>> {
    Json(match data.0 {
        Some(_data) => sql::get_days(_data.params.get("dateFrom"), _data.params.get("dateTo")),
        None => sql::get_days(None, None)
    })
}
