-- Create a table for profiles
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  role text not null,
  stack text[] not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Create policies
create policy "Users can view their own profiles" on profiles
  for select using (auth.uid() = user_id);

create policy "Users can insert their own profiles" on profiles
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own profiles" on profiles
  for update using (auth.uid() = user_id);

create policy "Users can delete their own profiles" on profiles
  for delete using (auth.uid() = user_id);
