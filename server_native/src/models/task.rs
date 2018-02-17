extern crate rustc_serialize;

#[derive(RustcDecodable, RustcEncodable)]
pub struct Task  {
    pub id: i64,
    pub day_id: i64,
    // pub created_at: String,
    // pub updated_at: String,
    pub description: String,
    pub synced: bool,
    pub time: i64, 
}