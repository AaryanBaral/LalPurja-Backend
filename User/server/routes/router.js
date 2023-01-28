const app = require("express");
const route = app.Router();
const LoanController = require("../controller/loancontroller")
const ContactController = require("../controller/contactcontroller")
const UserController = require("../controller/usercontroller")
const BlogController = require("../controller/blogcontroller")
const DevelopmentController = require("../controller/developmentcontroller")
const SellController = require("../controller/SellController")
const AgentController = require("../controller/agentcontroller")
const PropertyController = require("../controller/PropertyController");
const TestimonialController = require("../controller/testimonialController");
const RequestController = require("../controller/requestcontroller")
const ScheduleController = require("../controller/schedulecontroller")
const AdminController = require("../controller/admincontroller")
const VideoController = require("../controller/videocontroller");
const BookmarkController = require("../controller/bookmarkcontroller");
const YoutubeLinkController = require("../controller/youtubelinkcontroller");
const SubscriptionController = require("../controller/subscriptioncontroller");
const PartnerController = require("../controller/partnercontroller");
const ReqController = require("../controller/requirementcontroller");
const auth = require("../middleware/auth");
const AdminAuth = require("../middleware/adminAuth");
const UserAuth = require("../middleware/webauth");
const IsUserLoggedin = require("../middleware/IsUserLoggedin");
const IsAdminLoggedin = require("../middleware/IsAdminLoggedin");
const DealsControlleller = require("../controller/DealController");


//  for admin Login
route.post("/api/adminLogin",AdminController.AdminLogin);
route.post("/api/adminLogout",AdminAuth,UserController.Logout);



// for request property api 
route.get("/api/request",RequestController.FindRequest);
route.post("/api/request",RequestController.CreateRequest);
route.delete("/api/request",RequestController.DeleteRequest);
route.patch("/api/request",RequestController.UpdateRequest);

// for schedule a property
route.get("/api/admin/schedule",ScheduleController.FindSchedule);
route.post("/api/schedule",ScheduleController.CreateSchedule);
route.delete("/api/admin/schedule",ScheduleController.DeleteSchedule);

// for admin 
route.get("/api/admin/adminuser",AdminController.FindAdmin);
route.post("/api/admin/adminuser",AdminController.CreateAdmin);
route.patch("/api/admin/adminuser",AdminController.UpdateAdmin);
route.delete("/api/admin/adminuser",AdminController.DeleteAdmin);
route.get("/api/admin/individual",IsAdminLoggedin.auth);

// for contact api
route.get("/api/contact",ContactController.FindContact);
route.post("/api/contact",ContactController.CreateContact);
route.delete("/api/admin/contact",ContactController.DeleteContact);

// for user api
route.post("/api/user",UserController.Create);
route.get("/api/user",UserController.Find);
route.get("/api/user/individual",IsUserLoggedin.auth);
route.get("/api/user/contact",UserController.FindByContact);
route.delete("/api/admin/user",UserController.Delete);
route.patch("/api/admin/user",auth,UserController.Update);


// user login verify and logout
route.post("/api/login",UserController.Login);
route.post("/api/verify",UserController.Verify);
route.post("/api/logout",auth,UserController.Logout);

// for loan api
route.get("/api/loan",LoanController.FindLoan);
route.post("/api/loan",LoanController.CreateLoan);
route.delete("/api/admin/loan",LoanController.DeleteLoan);

// for sell property api
route.post("/api/sellproperty",SellController.CreateSell);
route.get("/api/sellproperty",SellController.FindSell);
route.delete("/api/admin/sellproperty",SellController.DeleteSell);

// for sell  property.
route.post("/api/sellproperty",SellController.CreateSell);
route.get("/api/sellproperty",SellController.FindSell);
route.delete("/api/admin/sellproperty",SellController.DeleteSell);
route.patch("/api/admin/sellproperty",SellController.UpdateSell);

// for admin pannel property control
route.get("/api/property",PropertyController.FindProperty);
route.post("/api/admin/property",PropertyController.CreateProperty);
route.patch("/api/admin/property",PropertyController.UpdateProperty);
route.delete("/api/admin/property",PropertyController.DeleteProperty);
route.get("/api/propertylocations",PropertyController.PropertyLocation);



// for agents data api
route.get("/api/admin/agents",AgentController.FindAgent);
route.post("/api/admin/agents",AgentController.CreateAgent);
route.patch("/api/admin/agents",AgentController.UpdateAgent);
route.delete("/api/admin/agents",AgentController.DeleteAgent);


// for blog data api
route.post("/api/admin/blog",BlogController.CreateBlog);
route.get("/api/blog",BlogController.FindBlog);
route.patch("/api/admin/blog",BlogController.UpdateBlog);
route.delete("/api/admin/blog",BlogController.DeleteBlog);


// for development data api
route.post("/api/admin/development",DevelopmentController.CreateDevelopment);
route.get("/api/development",DevelopmentController.FindDevelopment);
route.patch("/api/admin/development",DevelopmentController.UpdateDevelopment);
route.delete("/api/admin/development",DevelopmentController.DeleteDevelopment);

// for testimonials
route.post("/api/admin/testimonial",TestimonialController.CreateTestimonial);
route.get("/api/testimonial",TestimonialController.FindTestimonail);
route.patch("/api/admin/testimonial",TestimonialController.UpdateTestimonial);
route.delete("/api/admin/testimonial",TestimonialController.DeleteTestimonial);

// for video
route.post("/api/admin/video",VideoController.CreateVideo);
route.get("/api/video",VideoController.FindVideo);
route.delete("/api/admin/video",VideoController.DeleteVideo);
route.post("/api/addcomment",auth,VideoController.AddComment);
route.post("/api/bookmarkvideo",auth,VideoController.AddBookmark);
route.post("/api/unbookmarkvideo",auth,VideoController.DeleteBookmark);

// for youtube link
route.post("/api/admin/youtubelink",YoutubeLinkController.CreateVideo);
route.get("/api/youtubelink",YoutubeLinkController.FindVideo);
route.delete("/api/admin/youtubelink",YoutubeLinkController.DeleteVideo);

// for bookmark add and delete
route.post("/api/admin/bookmark/add",auth,BookmarkController.CreateBookmark);
route.post("/api/admin/bookmark/remove",auth,BookmarkController.DeleteBookmark);
route.get("/api/admin/bookmark/remove",auth,BookmarkController.GetBookmark);

// for subscription find and create
route.post("/api/subscription",SubscriptionController.CreateSubscription);
route.get("/api/subscription",SubscriptionController.FindSubscription);



// for partner 
route.post("/api/admin/partner",PartnerController.CreatePartner);
route.get("/api/partner",PartnerController.FindPartner);
route.delete("/api/admin/partner",PartnerController.DeletePartner);
route.patch("/api/admin/partner",PartnerController.UpdatePartner);


// for requirements
route.post("/api/admin/requirements",ReqController.CreateReq);
route.get("/api/requirements",ReqController.FindReq);
route.delete("/api/admin/requirements",ReqController.DeleteReq);
route.patch("/api/admin/requirements",ReqController.UpdateReq);


// for deals
route.post("/api/admin/deals",DealsControlleller.CreateProperty);
route.get("/api/deals",DealsControlleller.FindProperty);
route.delete("/api/admin/deals",DealsControlleller.DeleteProperty);
route.patch("/api/admin/deals",DealsControlleller.UpdateProperty);





module.exports = route


