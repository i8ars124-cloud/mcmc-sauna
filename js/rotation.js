$(function () {

    /**
     * 指定されたセレクタに基づいてカルーセルを初期化し、動作を設定する。
     * @param {string} sliderSelector '.auto-slider'
     * @param {string} contentSelector '.slider-content'
     * @param {string} navSelector '.section-nav'
     */
    function initializeCarousel(sliderSelector, contentSelector, navSelector) {

        // ページ内の全ての対象カルーセルに対してループ処理を行う
        $(sliderSelector).each(function () {
            const $slider = $(this); 

            //  要素の取得
            const $slides = $slider.children(contentSelector);
            const slideCount = $slides.length;

            // ナビゲーションボタンの取得
            // $slider の親要素内にあるナビゲーションコンテナを探す
            // * レンタルセクションは '.short-left-right-yohaku'、ドリンクセクションは '.w-1440' が親となるため両方指定
            const $navContainer = $slider.closest('.short-left-right-yohaku, .w-1440').find(navSelector);

            // * ページネーション要素の取得を追加★
            const $dotsContainer = $slider.closest('.short-left-right-yohaku, .w-1440').find('.carousel-pagination');
            const $dots = $dotsContainer.find('.dot');

            const $prevBtn = $navContainer.find('.prev-btn');
            const $nextBtn = $navContainer.find('.next-btn');

            let slideInterval;

            function updatePagination() {
                const $activeSlide = $slides.filter('[data-order="2"]');

                const slideIndex = $slides.index($activeSlide);

                if (slideIndex >= 0) {
                    $dots.removeClass('active');
                    // ドットに active クラスを追加
                    $dots.eq(slideIndex).addClass('active');
                }
            }


            //  初期設定
            if (slideCount >= 3) {
                $slides.eq(0).attr('data-order', 2).addClass('is-active');
                $slides.eq(1).attr('data-order', 3).removeClass('is-active');
                $slides.eq(2).attr('data-order', 1).removeClass('is-active');
                if ($(window).width() <= 768) {
                    updatePagination();
                }
            }

            // カルーセル更新
            function updateCarousel(direction) {
                $slides.each(function () {
                    let currentOrder = parseInt($(this).attr('data-order'));
                    let newOrder;

                    if (direction === 'next') {
                        newOrder = currentOrder % slideCount + 1;
                    } else {
                        newOrder = currentOrder - 1;
                        if (newOrder < 1) {
                            newOrder = slideCount;
                        }
                    }

                    $(this).attr('data-order', newOrder);

                    if (newOrder === 2) {
                        $(this).addClass('is-active');
                    } else {
                        $(this).removeClass('is-active');
                    }
                });

                //  * カルーセル更新後にページネーションも更新
                if ($(window).width() <= 768) {
                    updatePagination();
                }
            }

            // オートプレイ制御
            function stopAutoPlay() {
                clearInterval(slideInterval);
            }

            function startAutoPlay() {
                stopAutoPlay();
                slideInterval = setInterval(function () {
                    updateCarousel('prev');
                }, 3000);
            }

            // イベントリスナー
            $nextBtn.on('click', function () {
                // 変更: 'next'のボタンで 'prev'の動作（スライドを左へ）を実行
                updateCarousel('prev');

                // ナビボタンを押した後もオートプレイを再開
                if ($(window).width() <= 768) {
                    startAutoPlay();
                }
            });

            $prevBtn.on('click', function () {
                // 変更: 'prev'のボタンで 'next'の動作（スライドを右へ）を実行
                updateCarousel('next');

                // ナビボタンを押した後もオートプレイを再開
                if ($(window).width() <= 768) {
                    startAutoPlay();
                }
            });

            // オートプレイの開始条件
            if ($(window).width() <= 768) {
                startAutoPlay();

            }
        }); // .each() 終了
    }

    // ページ内の全カルーセルを初期化
    initializeCarousel(
        '.auto-slider',
        '.slider-content',
        '.section-nav'
    );
});