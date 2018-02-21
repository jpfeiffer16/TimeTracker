#[derive(Serialize,Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Category {
  id: Option<i64>,
  name: String
}