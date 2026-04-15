-- Create Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users NOT NULL,
    vendor_id INT REFERENCES vendors(id),
    venue_id INT REFERENCES venues(id),
    booking_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_amount INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT check_entity_id CHECK (
        (vendor_id IS NOT NULL AND venue_id IS NULL) OR 
        (venue_id IS NOT NULL AND vendor_id IS NULL)
    ),
    CONSTRAINT check_status CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Create Escrow Transactions table
CREATE TABLE IF NOT EXISTS escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) NOT NULL,
    amount INT NOT NULL,
    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'held_in_escrow',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT check_escrow_status CHECK (status IN ('pending', 'held_in_escrow', 'released_to_vendor', 'refunded'))
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_transactions ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON bookings
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vendors can view bookings for their id" ON bookings
    FOR SELECT
    TO authenticated
    USING (true); -- In a real app with vendor auth, this would check vendor ownership. For now, authenticated users can view all bookings (needed for calendar availability check).

-- Policies for escrow_transactions
CREATE POLICY "Users can view their own escrow transactions" ON escrow_transactions
    FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM bookings WHERE bookings.id = escrow_transactions.booking_id AND bookings.user_id = auth.uid()));

CREATE POLICY "Users can create their own escrow transactions" ON escrow_transactions
    FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (SELECT 1 FROM bookings WHERE bookings.id = escrow_transactions.booking_id AND bookings.user_id = auth.uid()));
