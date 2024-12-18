import NotFoundPage from "../pages/404.jsx";
import Dashboard from "../pages/dashboard";
import HomePage from "../pages/home";
import {NewOffer} from "../pages/new-offer";
import {MachineGlobalOffer} from "../views/machine-global-offer";
import {GlobalOffer} from "../pages/global-offer";
import {ComposeNewOffer} from "../views/compose-new-offer";
import {NewOfferAddons} from "../views/new-offer-addons";
import {Summary} from "../pages/summary";
import {GetOffers} from "../pages/get-offers";
import {EditOffer} from "../pages/edit-offer";
import {EditOfferAddons} from "../pages/edit-offer-addons";
import ResetPassword from "../pages/reset";

const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/reset-password/",
        component: ResetPassword
    },
    {
        path: "/dashboard/",
        async(routeTo, routeFrom, resolve, reject) {
            const router = this;
            if(sessionStorage.getItem("token")) {
                resolve({component: Dashboard});
            } else {
                reject();
                router.navigate("/");
            }
        }
    },
    {
        path: "/new-offer/",
        async(routeTo, routeFrom, resolve, reject) {
            const router = this;
            if(sessionStorage.getItem("token")) {
                resolve({component: NewOffer});
            } else {
                reject();
                router.navigate("/");
            }
        },
        master: true,
        routes: [
            {
                path: "/:id/",
                async(routeTo, routeFrom, resolve, reject) {
                    const router = this;
                    if(sessionStorage.getItem("token")) {
                        resolve({component: ComposeNewOffer});
                    } else {
                        reject();
                        router.navigate("/");
                    }
                },
                master: true,
                routes: [
                    {
                        path: "/:step/",
                        async(routeTo, routeFrom, resolve, reject) {
                            const router = this;
                            if(sessionStorage.getItem("token")) {
                                if(routeTo.params.step === "3") {
                                    resolve({component: Summary});
                                } else {
                                    resolve({component: NewOfferAddons});
                                }
                            } else {
                                reject();
                                router.navigate("/");
                            }
                        }
                    }
                ]
            }
        ]

    },
    {
        path: "/global-offer/",
        async(routeTo, routeFrom, resolve, reject) {
            const router = this;
            if(sessionStorage.getItem("token")) {
                resolve({component: GlobalOffer});
            } else {
                reject();
                router.navigate("/");
            }
        },
        master: true,
        routes: [
            {
                path: "/:id/",
                async(routeTo, routeFrom, resolve, reject) {
                    const router = this;
                    if(sessionStorage.getItem("token")) {
                        resolve({
                            component: MachineGlobalOffer,
                            id: routeTo.params.id
                        });
                    } else {
                        reject();
                        router.navigate("/");
                    }
                }
            }
        ]
    },
    {
        path: "/get-offers/",
        async(routeTo, routeFrom, resolve, reject) {
            const router = this;
            if(sessionStorage.getItem("token")) {
                resolve({component: GetOffers});
            } else {
                reject();
                router.navigate("/");
            }
        }
    },
    {
        path: "/edit-offer/:id",
        async(routeTo, routeFrom, resolve, reject) {
            const router = this;
            if(sessionStorage.getItem("token")) {
                resolve({component: EditOffer});
            } else {
                reject();
                router.navigate("/");
            }
        },
        master: true,
        routes: [
            {
                path: "/:page/",
                async(routeTo, routeFrom, resolve, reject) {
                    const router = this;
                    if(sessionStorage.getItem("token")) {
                        resolve({
                            component: EditOfferAddons,
                        });
                    } else {
                        reject();
                        router.navigate("/");
                    }
                }
            }
        ]
    },
    {
        path: "(.*)",
        component: NotFoundPage
    }
];

export default routes;
