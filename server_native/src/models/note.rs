#[derive(Serialize,Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Note {
  id: Option<i64>,
  title: Option<String>,
  text: Option<String>
}