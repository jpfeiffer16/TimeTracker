#[macro_use]
use std::collections::HashMap;

extern crate serde;
extern crate serde_derive;
extern crate serde_json;

#[derive(Deserialize, Debug)]
pub struct Body  {
  pub params: HashMap<String, String>
}