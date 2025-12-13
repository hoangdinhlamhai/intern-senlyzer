import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// TẠO EXTENSION TRƯỚC VÀ CHỈ CẦN MỘT LẦN
async function createExtensions() {
    // Chỉ cần chạy một lần duy nhất
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log('UUID Extension checked/created successfully.');
}

async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

// export async function GET() {
//   try {
//     await createExtensions();

//     const result = await sql.begin((sql) => [
//       seedUsers(),
//       seedCustomers(),
//       seedInvoices(),
//       seedRevenue(),
//     ]);

//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    // 1. Thực thi câu lệnh SELECT
    const users = await sql`SELECT * FROM users`;
    
    // 2. Trả về dữ liệu dưới dạng JSON
    // Bạn có thể SELECT nhiều bảng khác nhau nếu cần
    return Response.json({ 
      message: 'Data fetched successfully',
      users: users,
      // customers: await sql`SELECT * FROM customers`, // Ví dụ
    });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    // Trả về lỗi nếu có sự cố
    return Response.json({ 
      message: 'Failed to fetch data', 
      error: error 
    }, { status: 500 });
  }
}