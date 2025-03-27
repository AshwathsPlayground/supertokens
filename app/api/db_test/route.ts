import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // must be in `.env.local`
});

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return NextResponse.json({ time: result.rows[0].now });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to DB" },
      { status: 500 },
    );
  }
}
