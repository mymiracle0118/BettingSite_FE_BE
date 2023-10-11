<template>
    <div class="modal-18plus p-5">
        <div>
            <img :src="imgPath + 'front/img/18plus.png'">
        </div>
        <template v-if="$store.getters.domain == 'wolf777.com'">
            <p><b>Over 18s only</b> <br> <br>It is an offence for anyone under the age of 18 to open an account or to
                gamble on wolf777. wolf777 takes its age-verification responsibilities very
                seriously. We carry out age-verification checks on all customers who use payment
                mechanisms which are available to under 18s and additionally perform random
                age-verification checks on customers using other forms of funding mechanisms. We
                may ask for information to verify your age and could restrict or suspend your
                account until your age is confirmed.
                <br> <br>PLEASE NOTE THAT ANYONE UNDER THE AGE OF 18 YEARS OLD FOUND TO BE USING
                THIS SITE WILL HAVE ANY WINNINGS FORFEITED AND MAY ALSO BE REPORTED TO THE
                POLICE.
                <br> <br> <b>Filtering systems</b> <br> <br>wolf777 advises and encourages its customers to prevent
                minors from
                accessing gambling websites.
                <br> <br>Filtering solutions allow parents to regulate access to the internet,
                based on chosen criteria. Parents can use filters to prevent their children from
                accessing, amongst other things, gambling websites. Because our pages are
                'labelled', filtering solutions being used to prevent gambling access are able
                to detect our site content, and block our pages. If you share your computer with
                friends or family who are under the legal age to register or bet with our site,
                please consider parental filtering solutions such as:
                <br> <br>Net Nanny™
                <a href="https://www.netnanny.com" target="_blank">www.netnanny.com</a> <br> <br>CyberPatrol
                <a href="https://www.cyberpatrol.com" target="_blank">www.cyberpatrol.com</a></p>
        </template>

        <template v-else>
            <p>
                <b>Over 18s only</b>
                <br>
                <br>It is an offence for anyone under the age of 18 to open an account or to gamble on {{$store.getters.domainName}}.
                {{$store.getters.domainName}}
                takes
                its age-verification responsibilities very seriously. We carry out age-verification checks on all
                customers
                who use payment mechanisms which are available to under 18s and additionally perform random
                age-verification
                checks on customers using other forms of funding mechanisms. We may ask for information to verify your
                age
                and
                could restrict or suspend your account until your age is confirmed.
                <br>
                <br>PLEASE NOTE THAT ANYONE UNDER THE AGE OF 18 YEARS OLD FOUND TO BE USING THIS SITE WILL HAVE ANY
                WINNINGS
                FORFEITED AND MAY ALSO BE REPORTED TO THE POLICE.
                <br>
                <br>
                <b>Filtering systems</b>
                <br>
                <br>{{$store.getters.domainName}} advises and encourages its customers to prevent minors from accessing gambling websites.
                <br>
                <br>Filtering solutions allow parents to regulate access to the internet, based on chosen criteria.
                Parents
                can use filters to prevent their children from accessing, amongst other things, gambling websites.
                Because
                our
                pages are 'labelled', filtering solutions being used to prevent gambling access are able to detect our
                site
                content, and block our pages. If you share your computer with friends or family who are under the legal
                age
                to
                register or bet with our site, please consider parental filtering solutions such as:
                <br>
                <br>Net Nanny™
                <a href="https://www.netnanny.com" target="_blank">www.netnanny.com</a>
                <br>
                <br>CyberPatrol
                <a href="https://www.cyberpatrol.com" target="_blank">www.cyberpatrol.com</a>
            </p>
        </template>
    </div>
</template>
<script>
    export default {
        mounted() {

        },
        data() {
            return {
                imgPath: IMG_PATH,
            };
        },
        methods: {

        }
    };
</script>