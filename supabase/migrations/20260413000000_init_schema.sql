-- Create sequences
CREATE SEQUENCE IF NOT EXISTS vendor_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS venue_id_seq START 1;

-- Create Vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id INT PRIMARY KEY DEFAULT nextval('vendor_id_seq'),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    min_price INT NOT NULL,
    image VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Venues table
CREATE TABLE IF NOT EXISTS venues (
    id INT PRIMARY KEY DEFAULT nextval('venue_id_seq'),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    min_price INT NOT NULL,
    image VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- Create Policies (Only Authenticated Users can View)
CREATE POLICY "Enable read access for authenticated users only" ON vendors
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable read access for authenticated users only" ON venues
    FOR SELECT
    TO authenticated
    USING (true);

-- Insert Dummy Data for Vendors
INSERT INTO vendors (name, type, location, rating, min_price, image) VALUES
('The Grand Estate', 'Venue', 'Beverly Hills, CA', 4.9, 15000, 'https://picsum.photos/seed/estate/600/400'),
('Lumina Florals', 'Florist', 'Los Angeles, CA', 5.0, 2500, 'https://picsum.photos/seed/floral/600/400'),
('Culinary Canvas', 'Catering', 'Santa Monica, CA', 4.8, 5000, 'https://picsum.photos/seed/catering/600/400'),
('Oceanside Pavilion', 'Venue', 'Malibu, CA', 4.9, 12000, 'https://picsum.photos/seed/pavilion/600/400'),
('Rhythmic Beats', 'Entertainment', 'Hollywood, CA', 4.7, 1500, 'https://picsum.photos/seed/dj/600/400'),
('Elegance Rentals', 'Decor', 'Pasadena, CA', 4.9, 3500, 'https://picsum.photos/seed/decor/600/400')
ON CONFLICT DO NOTHING;

-- Insert Dummy Data for Venues
INSERT INTO venues (name, type, location, capacity, min_price, image) VALUES
('The Emerald Gardens', 'Outdoor', 'Santa Barbara, CA', 300, 12000, 'https://picsum.photos/seed/garden/600/400'),
('Skyline Penthouse', 'Indoor', 'Downtown LA', 150, 8500, 'https://picsum.photos/seed/penthouse/600/400'),
('Coastal Cliff Resort', 'Resort', 'Laguna Beach, CA', 250, 18000, 'https://picsum.photos/seed/cliff/600/400'),
('Vintage Winery', 'Vineyard', 'Napa Valley, CA', 400, 22000, 'https://picsum.photos/seed/winery/600/400'),
('The Crystal Ballroom', 'Indoor', 'Beverly Hills, CA', 500, 25000, 'https://picsum.photos/seed/ballroom/600/400')
ON CONFLICT DO NOTHING;
