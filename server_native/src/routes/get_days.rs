use rocket_contrib::{Json, Value};
use super::super::types::body::Body;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_days(data: Json<Body>) -> Json<Vec<super::super::models::day::Day>> {
    Json(match data.0.params {
        Some(params) => sql::get_days(params.get("dateFrom"), params.get("dateTo"), &data.0.db),
        None => sql::get_days(None, None, &data.0.db)
    })
}
