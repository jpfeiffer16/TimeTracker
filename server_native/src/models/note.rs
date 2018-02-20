#[derive(Serialize,Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Note {
  id: i64,
  title: String,
  text: String
}