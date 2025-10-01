use std::io;

fn is_leap_year(year: i32) -> bool {
    // A year is a leap year if:
    // 1. It's divisible by 4 AND not divisible by 100
    // OR
    // 2. It's divisible by 400
    (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}

fn main() {
    println!("🗓️  Leap Year Checker 🗓️");
    println!("========================");
    
    loop {
        println!("\nEnter a year (or 'q' to quit):");
        print!("> ");
        
        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("Failed to read line");
        
        let input = input.trim();
        
        // Check if user wants to quit
        if input.to_lowercase() == "q" || input.to_lowercase() == "quit" {
            println!("👋 Goodbye!");
            break;
        }
        
        // Parse the year
        let year: i32 = match input.parse() {
            Ok(num) => num,
            Err(_) => {
                println!("❌ Invalid input! Please enter a valid year.");
                continue;
            }
        };
        
        // Check if it's a leap year
        if is_leap_year(year) {
            println!("✅ {} is a LEAP YEAR! 🎉", year);
            println!("   It has 366 days (February has 29 days).");
        } else {
            println!("❌ {} is NOT a leap year.", year);
            println!("   It has 365 days (February has 28 days).");
        }
    }
}
