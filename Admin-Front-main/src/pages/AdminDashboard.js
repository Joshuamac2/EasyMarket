import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Orders from "./orders/Orders";
import Analytics from "./analytics/Analytics";
import UserManager from "./userManager/UserManager";
import ProductCreator from "./productManager/productCreator/ProductCreator";
import ProductCatalogue from "./productManager/productCatalogue/ProductCatalogue";
import BrandManagement from "./websiteManager/components/BrandManagement";
import CustomerServiceForm from "./websiteManager/components/CustomerServiceForm";
import HomePageManagement from "./websiteManager/components/HomePageManagement";
import ProductCategories from "./websiteManager/components/ProductCategories";
import EmailTemplateManagement from "./websiteManager/components/EmailTemplateManagement";
import { RiAccountCircleFill } from "react-icons/ri";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Collapse,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  AutoGraph as AutoGraphIcon,
  Group as GroupIcon,
  AutoStories as AutoStoriesIcon,
  Tune as TuneIcon,
  ExitToApp as ExitToAppIcon,
  ExpandLess,
  ExpandMore,
  ShoppingBasket as OrdersIcon,
  DesignServices as DesignServicesIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

function AdminDashboard({ setAuth }) {
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [websiteSettingsOpen, setWebsiteSettingsOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [data, setData] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const fetchOrdersData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_ORDER_DETAILS);
      const data = await response.json();

      if (Array.isArray(data)) {
        setOrderData(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setOrderData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setOrderData([]);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(process.env.REACT_APP_WEBSITE_TRAFFIC);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    const getName = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing");
          setAuth(false);
          return;
        }
        const response = await fetch(process.env.REACT_APP_GET_NAME, {
          method: "GET",
          headers: {
            jwt_token: localStorage.token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.error("Failed to authenticate with the server");
          setAuth(false);
          return;
        }
        const parseRes = await response.json();
        setName(parseRes.admin_username);
      } catch (err) {
        console.error("Error in getName:", err.message);
        setAuth(false);
      }
    };

    getName();
  }, [setAuth]);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  const menuItems = [
    { text: "Orders", icon: <OrdersIcon />, tab: "orders" },
    {
      text: "Catalogue",
      icon: <AutoStoriesIcon />,
      tab: "productCatalogue",
    },
    { text: "Create", icon: <DesignServicesIcon />, tab: "productCreator" },
    { text: "Analytics", icon: <AutoGraphIcon />, tab: "analytics" },
    { text: "Users", icon: <GroupIcon />, tab: "userManager" },

    {
      text: "Settings",
      icon: <TuneIcon />,
      onClick: () => setWebsiteSettingsOpen(!websiteSettingsOpen),
      subItems: [
        { text: "Brand", tab: "brandManagement" },
        { text: "Customer Service", tab: "customerServiceForm" },
        { text: "Home Page", tab: "homePageManagement" },
        { text: "Product Categories", tab: "productCategoriesForm" },
        { text: "Email Templates", tab: "emailTemplateForm" },
      ],
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: "none" }, ml: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              position: "relative",
              height: "100%",
              zIndex: 1000,
            },
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              backgroundColor: "#004d3a",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <List sx={{ flex: 1 }}>
              {menuItems.map((item) => (
                <React.Fragment key={item.text}>
                  <ListItem
                    button
                    onClick={item.onClick || (() => setActiveTab(item.tab))}
                    selected={activeTab === item.tab}
                    sx={{
                      backgroundColor:
                        activeTab === item.tab ? "#005f4a" : "#004d3a",
                      "&:hover": { backgroundColor: "#007b55" },
                      flexDirection: "column",
                      alignItems: "center",
                      py: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: "white", minWidth: "auto", mb: 1 }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: "white",
                        textAlign: "center",
                        "& .MuiListItemText-primary": { fontSize: "0.9rem" },
                      }}
                    />
                    {item.subItems &&
                      (websiteSettingsOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>

                  {item.subItems && (
                    <Collapse
                      in={websiteSettingsOpen}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem) => (
                          <ListItem
                            button
                            key={subItem.text}
                            sx={{
                              pl: 4,
                              backgroundColor:
                                activeTab === subItem.tab
                                  ? "#005f4a"
                                  : "#004d3a",
                              "&:hover": { backgroundColor: "#007b55" },
                              justifyContent: "center",
                            }}
                            onClick={() => setActiveTab(subItem.tab)}
                            selected={activeTab === subItem.tab}
                          >
                            <ListItemText
                              primary={subItem.text}
                              sx={{
                                color: "white",
                                textAlign: "center",
                                "& .MuiListItemText-primary": {
                                  fontSize: "0.8rem",
                                  padding: "5px",
                                  paddingRight: "15px",
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>
            <Box
              sx={{
                padding: "20px",
                borderTop: "1px solid #ccc",
                backgroundColor: "#004d3a",
                textAlign: "center",
              }}
            >
              <RiAccountCircleFill size={50} color="white" />
              <Typography variant="h6" sx={{ color: "white" }}>
                {name}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={logout}
                startIcon={<ExitToAppIcon />}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "#333" },
                  marginTop: "10px",
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          {activeTab === "analytics" && (
            <Analytics orderData={orderData} data={data} />
          )}
          {activeTab === "orders" && (
            <Orders
              name={name}
              orderData={orderData}
              setOrderData={setOrderData}
            />
          )}
          {activeTab === "productCreator" && <ProductCreator />}
          {activeTab === "productCatalogue" && <ProductCatalogue />}
          {activeTab === "userManager" && <UserManager />}
          {activeTab === "brandManagement" && <BrandManagement />}
          {activeTab === "customerServiceForm" && <CustomerServiceForm />}
          {activeTab === "homePageManagement" && <HomePageManagement />}
          {activeTab === "productCategoriesForm" && <ProductCategories />}
          {activeTab === "emailTemplateForm" && <EmailTemplateManagement />}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
