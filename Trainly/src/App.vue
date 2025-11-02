<template>
  <div>
    <!-- NavBar عام -->
    <NavBar
      v-if="
        ![
          'payment',
          'failed',
          'error',
          'resetpassword',
          'resetpassword2',
          'forgetpassword1',
          'forgetpassword2',
          'login',
          'signup',
          'trainerclient',
          'trainer',
          'trainerreviews',
          'trainersettings',
          'traineesettings',
          'traineeinbox',
          'trainee',
          'trainerplans',
          'trainercustomerservice',
          'traineecustomerservice',
          'trainerhome',
          'traineehome',
          'traineedashboard',
          'aboutustrainee',
          'sportstrainee',
          'contactustrainee',
          'search',
          'profile',
          'trainerviewprofile',
                    'trainerinbox',

        ].includes($route.name)
      "
    />

    <!-- SideBar عام -->
    <SideBar
      v-if="
        ![
          'landing',
          'payment',
          'failed',
          'error',
          'resetpassword',
          'resetpassword2',
          'forgetpassword1',
          'forgetpassword2',
          'login',
          'signup',
          'aboutus',
          'sports',
          'contactus',
          'traineesettings',
          'trainee',
          'traineehome',
          'traineecustomerservice',
          'traineedashboard',
                    'traineeinbox',

          'aboutustrainee',
          'sportstrainee',
          'contactustrainee',
          'profile',
          'search',
          'trainerviewprofile',
        ].includes($route.name)
      "
    />

    <!-- SideBarTrainee -->
    <SideBarTrainee
      v-if="
        ![
          'landing',
          'payment',
          'failed',
          'error',
          'resetpassword',
          'resetpassword2',
          'forgetpassword1',
          'forgetpassword2',
          'login',
          'signup',
          'aboutus',
          'sports',
          'contactus',
          'trainerclient',
          'trainerreviews',
          'trainersettings',
          'trainer',
          'trainerplans',
          'trainerhome',
          'trainercustomerservice',
          'traineehome',
          'aboutustrainee',
          'sportstrainee',
          'contactustrainee',
                    'trainerinbox',

          'profile',
          'search',
          'trainerviewprofile',
        ].includes($route.name)
      "
    />

    <!-- TraineeNavbar -->
    <TraineeNavbar
      v-if="
        ![
          'landing',
          'payment',
          'failed',
          'error',
          'resetpassword',
          'resetpassword2',
          'forgetpassword1',
          'forgetpassword2',
          'login',
          'signup',
          'aboutus',
          'sports',
          'contactus',
          'trainerclient',
          'trainerreviews',
          'trainersettings',
          'trainer',
          'trainerplans',
          'trainerhome',
          'trainercustomerservice',
          'traineecustomerservice',
          'traineedashboard',
          'traineesettings',
                    'traineeinbox',
                    'trainerinbox',

          'trainerviewprofile',
        ].includes($route.name)
      "
    />

    <!-- TrainerNavbar -->
    <TrainerNavbar
      v-if="
        ![
          'landing',
          'payment',
          'failed',
          'error',
          'resetpassword',
          'resetpassword2',
          'forgetpassword1',
          'forgetpassword2',
          'login',
          'signup',
          'aboutus',
          'sports',
          'contactus',
          'trainerclient',
          'trainerreviews',
          'trainersettings',
          'trainer',
          'trainerplans',
          'trainerhome',
          'trainercustomerservice',
          'traineecustomerservice',
          'traineedashboard',
          'traineesettings',
          'trainerdashboard',
          'traineehome',
'traineeinbox',
                    'trainerinbox',

          'profile',
          'search',
          'aboutustrainee',
          'sportstrainee',
          'contactustrainee',
        ].includes($route.name)
      "
    />

    <!-- SideBarAdmin -->
    <SideBarAdmin
        v-if="['adminoverview','managetrainers','managetrainees','adminbookings','adminpayments','adminreviews'].includes($route.name)"
    />


    <!-- عرض الصفحات -->
    <router-view />


    <!-- Footer -->
    <FooterComp
      v-if="
        ![
          'payment',
          'failed',
          'error',
          'login',
          'signup',
          'trainerclient',
          'trainer',
          'trainerreviews',
          'trainersettings',
          'traineesettings',
          'trainer',
          'trainee',
          'trainerplans',
          'traineecustomerservice',
          'trainercustomerservice',
          'trainerhome',
          'trainerinbox'
          ,
          'traineedashboard',
        ].includes($route.name)
      "
    />
  </div>
</template>


<script>
import FooterComp from "./components/FooterComp.vue";
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import SideBarTrainee from "./components/SideBarTrainee.vue";
import TraineeNavbar from "./components/TraineeNavbar.vue";
import TrainerNavbar from "./components/TrainerNavbar.vue";
import SideBarAdmin from "./components/SideBarAdmin.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FooterComp,
    SideBar,
    SideBarTrainee,
    TraineeNavbar,
    TrainerNavbar,
    SideBarAdmin,

  },
};
</script>

<style>
body {
  background-color: white;
}

.dark body {
  background-color: black;
}
</style>
