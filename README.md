# Limitless Law Firm Website

A professional, modern website for Limitless Law Firm, featuring responsive design and comprehensive legal practice area coverage.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design inspired by top law firm websites
- **Multiple Pages**: Home, About Us, Practice Areas, and Contact pages
- **Contact Form**: Integrated with EmailJS for form submissions
- **Practice Areas**: Comprehensive coverage of 9 practice areas:
  - Car Accidents
  - Truck Accidents
  - Motorcycle Accidents
  - Slip & Fall
  - Wrongful Death
  - Brain Injury
  - Dog Bites
  - Workers Compensation
  - Employment Law

## Setup Instructions

### 1. EmailJS Configuration

To enable the contact form functionality, you need to set up EmailJS:

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create an Email Template**
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Use the following template variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{phone}}` - Sender's phone number
     - `{{case_type}}` - Case type selected
     - `{{message}}` - Message content
   - Set the "To Email" field to: `Eli@limitlesslawllp.com` or `Gabriel@limitlesslawllp.com`
   - Save the template

4. **Update script.js**
   - Open `script.js`
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key (found in Account > General)
   - Replace `YOUR_SERVICE_ID` with your Email Service ID
   - Replace `YOUR_TEMPLATE_ID` with your Email Template ID

### 2. Local Development

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then open `http://localhost:8000` in your browser.

### 3. Deployment

You can deploy this website to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web hosting service

Simply upload all files to your hosting service.

## File Structure

```
website/
├── index.html          # Homepage
├── about.html          # About Us page
├── practice-areas.html # Practice Areas page
├── contact.html        # Contact page with form
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Colors
The color scheme can be customized in `styles.css` by modifying the CSS variables:
- `--primary-color`: Main dark color
- `--secondary-color`: Secondary dark color
- `--accent-color`: Gold accent color
- `--text-dark`: Dark text color
- `--text-light`: Light text color

### Content
- Update attorney information in `about.html`
- Modify practice area descriptions in `practice-areas.html`
- Update contact information in all pages' footers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The contact form requires EmailJS setup to function
- All phone numbers are clickable and will open the device's dialer
- All email addresses are clickable mailto links
- The website is fully responsive and mobile-friendly

## Support

For issues or questions about this website, please contact the development team.
