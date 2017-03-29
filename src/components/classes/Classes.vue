<template>
    <div>

        <!-- BANNER -->
        <div class="banner banner--m go go--bottom" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/featured-banner-3.jpg');">
            <div class="banner__content container container--fw container--l is--reversed">
                <div class="wrapper">
                    <div class="banner__text wrapper__inner">
                        <a id="mobilePlay" class="btn__play" href="#">Watch</a>
                        <span class="banner__featured ts--title is--secondary">Featured in &mdash; Lifestyle, Money, Entrepreneurship</span>
                        <a class="banner__title ts--display link" href="/templates/classes/class">How to Save America, One Story at a Time</a>
                        <div class="divider divider--s"></div>
                        <ul class="list list--inline list--divided list--box">
                            <li class="item has--icon">
                                <span class="avatar avatar--m" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-mike.jpg');"></span>
                                <a class="link link--secondary" href="#">Mike Rowe</a>
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up color--white">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-users color--white">
                                    <use xlink:href="#icon-users"></use>
                                </svg>
                                3.1K
                            </li>
                        </ul>
                    </div>
                    <div class="banner__play wrapper__inner align--right">
                        <a class="btn__play btn--l" href="#">Watch</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- /BANNER -->

        <!-- CATEGORIES NAV -->
        <div id="categoryTabs" class="bg--white">
            <ul class="tab__group bg--white">
                <li class="item" :class="{'is--active': selectedCategory == 'mindset'}" @click="catClicked('mindset')">
                    <svg class="icon-mindset icon--m">
                        <use xlink:href="#icon-mindset"></use>
                    </svg>
                    <span class="tab__title">Mindset</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'productivity'}" @click="catClicked('productivity')">
                    <svg class="icon-productivity icon--m">
                        <use xlink:href="#icon-productivity"></use>
                    </svg>
                    <span class="tab__title">Productivity</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'entrepreneurship'}" @click="catClicked('entrepreneurship')">
                    <svg class="icon-entrepreneurship icon--m">
                        <use xlink:href="#icon-entrepreneurship"></use>
                    </svg>
                    <span class="tab__title">Entrepreneurship</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'money'}" @click="catClicked('money')">
                    <svg class="icon-money icon--m">
                        <use xlink:href="#icon-money"></use>
                    </svg>
                    <span class="tab__title">Money</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'giving'}" @click="catClicked('giving')">
                    <svg class="icon-giving icon--m">
                        <use xlink:href="#icon-giving"></use>
                    </svg>
                    <span class="tab__title">Giving</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'fitness'}" @click="catClicked('fitness')">
                    <svg class="icon-health-fitness icon--m">
                        <use xlink:href="#icon-health-fitness"></use>
                    </svg>
                    <span class="tab__title">Health &amp; Fitness</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'defense'}" @click="catClicked('defense')">
                    <svg class="icon-defense icon--m">
                        <use xlink:href="#icon-defense"></use>
                    </svg>
                    <span class="tab__title">Defense</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'lifestyle'}" @click="catClicked('lifestyle')">
                    <svg class="icon-lifestyle icon--m">
                        <use xlink:href="#icon-lifestyle"></use>
                    </svg>
                    <span class="tab__title">Lifestyle</span>
                </li>
                <li class="item" :class="{'is--active': selectedCategory == 'relationships'}" @click="catClicked('relationships')">
                    <svg class="icon-relationships icon--m">
                        <use xlink:href="#icon-relationships"></use>
                    </svg>
                    <span class="tab__title">Relationships</span>
                </li>
            </ul>
        </div>
        <!-- /CATEGORIES NAV -->

        <!-- CATEGORIES NAV (MOBILE)-->
        <div id="categoryDropdown">
            <div class="input input--dropdown" data-name="categorySelector">
                <!-- <label>Categories</label> -->
                <span class="input__field">Make a Selection</span>
                <ul class="dropdown__list">
                    <li class="item">All</li>
                    <li class="item">Mindset</li>
                    <li class="item">Productivity</li>
                    <li class="item">Entrepreneurship</li>
                    <li class="item">Money</li>
                    <li class="item">Giving</li>
                    <li class="item">Health &amp; Fitness</li>
                    <li class="item">Defense</li>
                    <li class="item">Lifestyle</li>
                    <li class="item">Relationships</li>
                </ul>
            </div>
        </div>
        <!-- /CATEGORIES NAV (MOBILE)-->

        <!-- CLASS LIST -->
        <div class="content__section row container container--fw container--s">

            <div class="wrapper heading">
                <div class="wrapper__inner fontSize--m">
                    Sort by:
                    <span class="link link--dropdown has--dropdown is--inline">
                {{ currentSort }}
                <ul class="list list--nav">
                    <li class="item" @click="sortClasses('newest')">
                        <a>Newest First</a>
                    </li>
                    <li class="item" @click="sortClasses('highest')">
                        <a>Highest Rated</a>
                    </li>
                    <li class="item" @click="sortClasses('popular')">
                        <a>Most Popular</a>
                    </li>
                </ul>
            </span>
                </div>
                <div class="wrapper__inner align--right">
                    <button class="btn btn--secondary">Follow</button>
                </div>
            </div>

            <div class="row grid">

                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2" data-progress="0">
                    <a class="class__thumb" href="/templates/classes/class">
                        <!-- TODO: Need to add progress circles to already started courses. The percent/100 should be appended to the 'data-progress' attribute -->
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-1.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">The Power of Being Broke</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-daymond.jpg');"></span>                                Daymond John
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                    <a class="class__thumb" href="/templates/classes/class">
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-2.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">How to Attract One Million Fans While Raising Four Kids</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-rachel.jpg');"></span>                                Rachel Maser
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                    <a class="class__thumb" href="/templates/classes/class">
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-3.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">How to Grow Your Brand and Live Your Dream</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-lewis.jpg');"></span>                                Lewis Howes
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                    <a class="class__thumb" href="/templates/classes/class">
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-4.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">How to Turn a Pattern of Failure into a Pattern of Success</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-james.jpg');"></span>                                James Altucher
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                    <a class="class__thumb" href="/templates/classes/class">
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-5.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">How to Become a Productivity Monster, Crush Your Goals and Change Your Life Forever</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-david.jpg');"></span>                                David Osborn
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                    <a class="class__thumb" href="/templates/classes/class">
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-6.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">Ryan Holiday's Ultimate Guide to Free Press</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-ryan.jpg');"></span>                                Ryan Holiday
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

                <!-- SINGLE CLASS -->
                <div class="class col col--3-of-12 col--m-1-of-3 col--s-1-of-2">
                    <a class="class__thumb" href="/templates/classes/class">
                        <img src="https://s3.amazonaws.com/selfmademan/assets/img/placeholder/class-thumb-7.png" alt="">
                        <span class="btn__play btn--s btn--secondary"></span>
                        <span class="image__cap">
                    <svg class="icon-time icon--s"><use xlink:href="#icon-time"></use></svg>
                    2h 16m
                </span>
                    </a>
                    <div class="class__info">
                        <a class="link" href="#">Juiced: How to Transform Your Body, and Your Business</a>
                        <ul class="class__meta list list--inline">
                            <li class="item has--icon">
                                <span class="avatar avatar-s" style="background-image:url('https://s3.amazonaws.com/selfmademan/assets/img/placeholder/instructor-drew.jpg');"></span>                                Drew Canole
                            </li>
                            <li class="item has--icon">
                                <svg class="icon-thumbs-up">
                                    <use xlink:href="#icon-thumbs-up"></use>
                                </svg>
                                <a class="link link--secondary" href="#">1.2k</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE CLASS -->

            </div>

        </div>
        <!-- /CLASS LIST -->
    </div>
</template>

<script>
    import Slick from 'vue-slick';

    export default {
        data: function () {
            return {
                currentSort: 'Newest First',
                savedClasses: [],
                selectedCategory: '',
                slickOptions: {
                    lazyLoad: 'ondemand',
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                },
            }
        },
        components: {
            Slick
        },
        methods: {
            catClicked(topic) {
                this.selectedCategory = topic;
            },
            sortClasses(search) {
                switch (search) {
                    case 'newest':
                        this.currentSort = 'Newest First';
                        break;
                    case 'popular':
                        this.currentSort = 'Most Popular';
                        break;
                    case 'highest':
                        this.currentSort = 'Highest Rated';
                        break;
                    default:
                        this.currentSort = 'Newest First';
                }
            }
        }
    }

</script>

<style lang="css">

</style>