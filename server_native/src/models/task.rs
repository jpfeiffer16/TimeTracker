#[derive(Serialize, Deserialize)]
pub struct Task  {
    pub id: i64,
    pub description: String,
    pub time: i64, 
    pub created_at: String,
    pub updated_at: String,
    pub day_id: i64,
    pub synced: bool,
}