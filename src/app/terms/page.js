export const metadata = {
  title: 'Terms and Conditions | Mango Bite Hotel',
};

export default function TermsAndConditions() {
  return (
    <div className="container" style={{ paddingTop: 'px', paddingBottom: '80px', minHeight: '80vh' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '40px', borderBottom: '2px solid rgba(197, 85, 59, 0.2)', paddingBottom: '15px', fontSize: '2.5rem' }}>
        Terms and Conditions
      </h1>

      <div style={{ lineHeight: '1.8', color: '#444', fontSize: '1.1rem', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <p style={{ marginBottom: '30px' }}>
          Welcome to The Mango Bite Hotel & Restaurant. By accessing our website and utilizing our services, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--dark)' }}>1. Reference Images (Menu & General Facilities)</h3>
        <p style={{ marginBottom: '20px' }}>
          Please note that the images of food items presented in our restaurant menu, as well as certain general facilities depicted on this website, are strictly for <strong>reference and illustration purposes only</strong>. The actual presentation, plating, portion sizes, and physical appearance may vary and should not be considered as final representations.
        </p>

        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--dark)' }}>2. Room Photographs</h3>
        <p style={{ marginBottom: '20px' }}>
          Unlike our food menu, the photographs and images shown for our <strong>Rooms</strong> represent the actual physical accommodations. The room design, setup, and features you see in the booking details are exactly what you will receive during your stay, ensuring full transparency in your room booking experience.
        </p>

        <h3 style={{ marginTop: '30px', marginBottom: '15px', color: 'var(--dark)' }}>3. General Provisions</h3>
        <p style={{ marginBottom: '20px' }}>
          We reserve the right to modify these terms at any time without prior notice. Your continued use of the website following any changes signifies your acceptance of the new terms. If you have any questions or concerns regarding these terms, please contact us at our official email or phone numbers provided in the footer.
        </p>
      </div>
    </div>
  );
}
