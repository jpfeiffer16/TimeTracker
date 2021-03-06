#[derive(Debug)]
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Task  {
    pub id: Option<i64>,
    pub description: Option<String>,
    pub time: Option<f64>,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
    pub day_id: Option<i64>,
    pub synced: Option<bool>
}