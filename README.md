# EasyMarket

**EasyMarket** is a comprehensive e-commerce platform that allows businesses to establish and manage their online stores effortlessly. It features a **public-facing website** for showcasing and selling products and an **admin dashboard** for managing all aspects of the store, from products and branding to orders and customer communication.
EasyMarket simplifies the process of setting up and managing an online store:
- **API Integrations**: Freedom to integrate with any API, enabling businesses to explore and adopt cost-effective alternatives, such as more affordable payment providers, significantly reducing operational expenses.
- **Ease of Use**: Minimal setup required.
- **Customisable**: Tailored pages, product categories, and branding.
- **Analytics**: Gain insights into sales.
- **Comprehensive Management**: All-in-one dashboard for store operations.

---
<br/>


# **Public-Facing Website**
The public-facing website serves as the storefront for your business. It allows customers to:

| **Feature**          | **Description**                                                                                           |
|-----------------------|-----------------------------------------------------------------------------------------------------------|
| **Explore and purchase products** | Majority set up by the store owner.|
|**Home Page**| The home page features highly customisable content, allowing you to tailor imagery, text, and layout to reflect your brand’s identity. |
| **Communications** | Order confirmations are automatically sent to purchasers, with options to contact support or sign up for newsletters—all supported by fully customisable email templates.|
| **Engage with all pages**  | Company information, and policy pages, all customisable through the admin dashboard.                        |


---
<br/>

<p align="center">
  <img src="https://github.com/user-attachments/assets/676cf1c9-053a-4274-a529-1a0af04392d4" alt="image" width="800">
</p>

---
<br/>

# **Admin Dashboard**
The admin dashboard provides store owners with powerful tools to manage their business. Key functionalities include:

| **Feature**          | **Description**                                                                                           |
|-----------------------|-----------------------------------------------------------------------------------------------------------|
| **Orders Management** | Track and manage sales, review historical data, and mark orders as actioned with timestamps.              |
| **Product Catalogue** | Edit, activate/deactivate products, manage stock, set discounts, and link related products.               |
| **Product Creation**  | Create new products, define pricing and stock, and associate them with categories.                        |
| **Analytics**         | Monitor sales data and website product views.                                                             |
| **User Management**   | Approve or deactivate admin users and handle dashboard access requests.                                   |
| **Branding**          | Manage branding and links displayed across the public-facing site.                                      |
| **Customer Service**  | Configure customer service policies and delivery options for the stripe API.                                                |
| **Home Page Setup**   | Customise the homepage with images and content placement.                                                 |
| **Product Categories**| Create and manage product categories, and assign products to categories.                                  |
| **Email Templates**   | Link email templates from Brevo for order confirmations, newsletters, and customer inquiries.             |

---
![Screenshot 2025-01-01 at 21-46-35 React App](https://github.com/user-attachments/assets/d4e53645-6f2e-4bff-9131-aef3c586c429)

---
<br/>

## **Core Functionalities in Detail**

### **Orders Page**
The Orders tab provides a comprehensive view of all orders placed through the public-facing website. It includes a detailed table with historical order information. Clicking on any row opens a modal with additional order details and an option to mark the order as completed. This ensures efficient tracking of order statuses, including direct references to payment details within your Stripe dashboard.

**Key Features:**
- Access detailed order history and insights.
- Mark orders as completed with automatic timestamping.
- Efficiently manage pending and completed orders.
- Easily reference Stripe payment information for each order.

### **Catalogue Page**
The Catalogue tab serves as the central hub for managing all products created for your shop. It provides a detailed table displaying essential product information, including stock levels, sale status, linked products, and pricing. This page also offers various tools and actions, enabling you to edit product details, manage stock, and preview products as they will appear on the public-facing website before publishing.

**Key Features:**
- Efficiently filter and search through your product catalogue.
- Edit product details, including price, description, and images.
- Automatically update stock levels as sales occur.
- Activate or deactivate products to control public visibility.
- Preview products before making them live.
- Customise product visibility, such as featuring them on the homepage or product pages.
- Link related products to create a cohesive shopping experience.
- Apply sales or discounts to boost visibility and drive sales.

### **Create Page**
The Create tab provides a simple and efficient way to add new products to your shop. Its flexible fields can be easily adapted to suit the specific types of products you sell. This is where you define the details of your products before making them live on the public-facing website. You can add essential product information, such as titles, descriptions, and pricing, as well as set availability and visibility across your site. Products can be saved as drafts for later publication or made ready for immediate availability.

**Key Features:**
- Quickly add new products to your catalogue.
- Define product details, including titles, descriptions, imagery, and pricing.
- Set stock levels and control product visibility across the site.
- Link products to categories or related items for seamless navigation.
- Preview your products whilst you build them. 
- Save drafts for products under development or publish immediately.

### **Analytics Page**
The Analytics tab offers valuable insights into your store's performance, empowering you to make data-driven decisions. It provides a comprehensive overview of sales data, whether you want to review total sales over time or break it down by year, month, or day. Additionally, it highlights your best-selling products and tracks the level of customer engagement through shop views and interactions.

**Key Features:**
- Review total sales with flexible period-based filters (all-time, yearly, monthly, or daily).
- Identify best-selling products and assess their impact on revenue.
- Monitor customer engagement through detailed view metrics.
- Gain actionable insights to improve store performance.

### **Users Page**
The Users tab is designed to manage administrative access to the platform. Potential users can request to join the private domain, and their requests will be displayed for review. This ensures that only approved individuals can access the dashboard. Additionally, you can manage existing admin users and their permissions.

**Key Features:**
- Review and approve access requests for the platform.
- Manage admin users and their permissions with ease.
- Deactivate or revoke access as needed for security and control.

### **Brand Page**
The Brand tab enables you to establish the foundational identity of your store. Here, you can create a consistent branding experience by uploading imagery, setting titles, and crafting slogans that appear across the public-facing website. This ensures your store reflects your brand's unique personality and message.

**Key Features:**
- Upload and manage brand imagery for visual consistency.
- Set titles and slogans to enhance your store’s identity.
- Update brand-related information, including names and links displayed throughout the website.

### **Customer Service Page**
The Customer Service page helps you manage the critical content related to customer support and policies. This includes updating the information displayed on the public-facing website, such as return, shipping, and privacy policies. Additionally, you can configure delivery options that integrate seamlessly with Stripe, allowing customers to choose from options like Standard or Express delivery.

**Key Features:**
- Customise content for policy pages, including returns, shipping, and privacy policies.
- Set and manage delivery options available to customers, integrated with Stripe.
- Provide clear and accessible customer service information for a seamless shopping experience.

### **Home Page**
The Home Page tab is where you can manage the bulk of the content displayed on your public-facing website. This includes the ability to fully customize all imagery and most of the text, giving you complete control over the look and feel of your homepage. It's designed to allow businesses to easily update and refresh content as needed, keeping your site dynamic and aligned with your current offerings.

**Key Features:**
- Fully customize the homepage with text, images, and other content elements.
- Easily update and manage content to keep your website fresh and engaging.

### **Product Categories**
The Product Categories page enables businesses to define and organise the types of products they are selling. Categorising products ensures they are displayed in the appropriate sections and makes them easier to search for. When a new category is created, an automatically generated page is created for that category, allowing customers to search for products of interest within that category.

**Key Features:**
- Create, activate, or deactivate product categories.
- Automatically generate dedicated category pages for public display.
- Assign products to categories to improve organisation and navigation.


### **Email Templates**
The Email Templates page allows business owners to personalise and manage their email communications via the Brevo API. This enables quick updates to media and content for various user interactions, such as order confirmations, promotional sales, and newsletters, helping businesses engage with their customers.


**Key Features:**
- Integrate Brevo API for automated email communication:
-   Order confirmations.
-   Newsletter subscriptions.
-   Customer inquiries.

---

## **Third-Party Integrations**
- **Stripe**: Primary payment provider with plans for additional providers in future updates.
- **Brevo**: Email campaign management for order confirmations, newsletters, and customer communication.

---
