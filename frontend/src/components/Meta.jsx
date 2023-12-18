import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "ShopHub Pro: Elevate Your Online Retail Experience",
  description:
    "Discover the ultimate e-commerce solution with ShopHub Pro. Unleash the power of seamless online transactions, intuitive product management, and secure payment processing. Elevate your business with a user-friendly platform that ensures a delightful shopping experience for your customers. From customizable storefronts to advanced analytics, ShopHub Pro empowers you to build, grow, and succeed in the digital marketplace. Join the future of online retail – where innovation meets simplicity!",
  keywords:
    "Online Retail, E-commerce Solution, ShopHub Pro, Digital Marketplace, Secure Payment Processing, User-Friendly Platform, Seamless Transactions, Product Management, Customizable Storefronts, Advanced Analytics",
};

export default Meta;
