#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Task  {
    pub id: i64,
    pub description: String,
    pub time: f64,
    pub created_at: String,
    pub updated_at: String,
    pub day_id: i64,
    pub synced: Option<bool>
}