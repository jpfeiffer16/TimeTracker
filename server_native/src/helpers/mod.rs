pub fn get_iso_date(original_str: String) -> String {
    let mut parts = original_str.split(" ");
    format!("{}T{}Z", parts.nth(0).unwrap(), parts.nth(0).unwrap())
}

pub fn get_sqlite_date(original_str: String) -> String {
    let mut parts = original_str.split("T");
    format!("{} {} +00:00", parts.nth(0).unwrap(), parts.nth(0).unwrap().replace("Z", ""))
}