<template>
    <div class="report-box faq-container">
        <div class="report-title">
            <div class="report-name">Frequently asked questions (FAQ)</div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12">
                <div class="faq-question-box">
                    <h5>1. Follow this video tutorial when the game does not work in safari browser.</h5>
                    <div><p><a href="javascript:void(0);" v-b-modal.faq-1-1>Click here</a> to watch the video tutorial!</p></div>
                    <b-modal id="faq-1-1" title="1. Follow this video tutorial when the game does not work in safari browser" body-class="text-center" hide-footer>
                        <video width="100%" autoplay="" controls="">
                            <source :src="`${imgPath}front/img/FAQ/1/safari-mobile.mp4`" type="video/mp4">
                        </video>
                    </b-modal>
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div class="faq-question-box">
                    <h5>2. Follow this video tutorial when the game does not work in private browser</h5>
                    <div class="casino-tabs">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a href="#chrome" class="nav-link active" data-toggle="tab">Chrome</a>
                            </li>
                            <li class="nav-item">
                                <a href="#firefox" class="nav-link" data-toggle="tab">Firefox</a>
                            </li>
                            <li class="nav-item">
                                <a href="#edge" class="nav-link" data-toggle="tab">Edge</a>
                            </li>
                            <li class="nav-item">
                                <a href="#safari" class="nav-link" data-toggle="tab">Safari</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content">
                        <div id="chrome" class="tab-pane active">
                            <div><p><a href="javascript:void(0);" v-b-modal.faq-2-1>Click here</a> to watch the video tutorial!</p></div>
                            <b-modal id="faq-2-1" size="lg" title="Chrome" body-class="text-center" hide-footer>
                                <video width="100%" autoplay="" controls="">
                                    <source :src="`${imgPath}front/img/FAQ/2/chrome.mp4`" type="video/mp4">
                                </video>
                            </b-modal>
                        </div>
                        <div id="firefox" class="tab-pane fade">
                            <div><p><a href="javascript:void(0);" v-b-modal.faq-2-2>Click here</a> to watch the video tutorial!</p></div>
                            <b-modal id="faq-2-2" size="lg" title="Firefox" body-class="text-center" hide-footer>
                                <video width="100%" autoplay="" controls="">
                                    <source :src="`${imgPath}front/img/FAQ/2/firefox.mp4`" type="video/mp4">
                                </video>
                            </b-modal>
                        </div>
                        <div id="edge" class="tab-pane fade">
                            <div><p><a href="javascript:void(0);" v-b-modal.faq-2-3>Click here</a> to watch the video tutorial!</p></div>
                            <b-modal id="faq-2-3" size="lg" title="Edge" body-class="text-center" hide-footer>
                                <video width="100%" autoplay="" controls="">
                                    <source :src="`${imgPath}front/img/FAQ/2/edge.mp4`" type="video/mp4">
                                </video>
                            </b-modal>    
                        </div>
                        <div id="safari" class="tab-pane fade">
                            <div><p><a href="javascript:void(0);" v-b-modal.faq-2-4>Click here</a> to watch the video tutorial!</p></div>
                            <b-modal id="faq-2-4" size="lg" title="Safari" body-class="text-center" hide-footer>
                                <video width="100%" autoplay="" controls="">
                                    <source :src="`${imgPath}front/img/FAQ/2/safari.mp4`" type="video/mp4">
                                </video>
                            </b-modal>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div class="faq-question-box">
                    <h5>3.  Follow this video tutorial when the game does not work in apple product.</h5>
                    <div class="casino-tabs">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a href="#mobile" class="nav-link active" data-toggle="tab">Settings for Mobile </a>
                            </li>
                            <li class="nav-item">
                                <a href="#web" class="nav-link" data-toggle="tab">Settings for Desktop</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content">
                        <div id="mobile" class="tab-pane active">
                            <div><p><a href="javascript:void(0);" v-b-modal.faq-3-1>Click here</a> to watch the video tutorial!</p></div>
                            <b-modal id="faq-3-1" title="Settings for Mobile " body-class="text-center" hide-footer>
                                <video width="100%" autoplay="" controls="">
                                    <source :src="`${imgPath}front/img/FAQ/3/allow-popup-mobile.mp4`" type="video/mp4">
                                </video>
                            </b-modal>
                        </div>
                        <div id="web" class="tab-pane fade">
                            <div><p><a href="javascript:void(0);" v-b-modal.faq-3-2>Click here</a> to watch the video tutorial!</p></div>
                            <b-modal id="faq-3-2" size="lg" title="Settings for Desktop" body-class="text-center" hide-footer>
                                <video width="100%" autoplay="" controls="">
                                    <source :src="`${imgPath}front/img/FAQ/3/allow-popup-web.mp4`" type="video/mp4">
                                </video>
                            </b-modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- <div class="report-box faq-container">
        <div class="report-title">
            <div class="report-name">Frequently asked question (FAQ)</div>
        </div>
        <div class="faq-question-box">
            <h5>1. Follow this video tutorial when the game does not work in safari browser.</h5>
            <div>
                <video width="320" autoplay="" controls="">
                    <source :src="`${imgPath}front/img/FAQ/faq.mp4`" type="video/mp4">
                </video>
            </div>
        </div>
    </div> -->
</template>

<script>
    export default {
        components: {

        },
        mounted() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        data() {
            return {
                imgPath: IMG_PATH,
            }
        },
        methods: {

        }
    }
</script>