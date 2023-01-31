<?php

namespace RedFireFarm\CsaPlugin\Api\Repositories\Test;

use InvalidArgumentException;
use RedFireFarm\CsaPlugin\Api\Factories\PostFactory;
use RedFireFarm\CsaPlugin\Api\Repositories\PostRepository;
use RuntimeException;
use WP_Mock;
use WP_Mock\Tools\TestCase;

class PostRepositoryTest extends TestCase {
    public function setUp(): void
    {
        WP_Mock::setUp();
        WP_Mock::passthruFunction('wp_strip_all_tags');
        WP_Mock::userFunction('get_current_user_id');
        WP_Mock::passthruFunction('sanitize_trackback_urls');
        WP_Mock::passthruFunction('get_default_comment_status');
        WP_Mock::userFunction('get_option', [
            'return' => 0,
        ]);
    }

    public function tearDown(): void
    {
        WP_Mock::tearDown();
    }
    /**
     * test that we can create a single resource
     * @return void
     */
    function test_create_resource(): void
    {
        WP_Mock::userFunction('is_wp_error', array(
            'times'=> 1,
            'args' => [1],
            'return' => false,
        ));
        $post = PostFactory::create();
        WP_Mock::userFunction('wp_insert_post', array(
            'times' => 1,
            'args' => array(
                array(
                    'id' => $post->id,
                    'post_author' => $post->post_author,
                    'post_date' => $post->post_date,
                    'post_date_gmt' => $post->post_date_gmt,
                    'post_content' => $post->post_content,
                    'post_content_filtered' => $post->post_content_filtered,
                    'post_title' => $post->post_title,
                    'post_excerpt' => $post->post_excerpt,
                    'post_status' => $post->post_status,
                    'post_type' => $post->post_type,
                    'comment_status' => $post->comment_status,
                    'ping_status' => $post->ping_status,
                    'post_password' => $post->post_password,
                    'post_name' => $post->post_name,
                    'to_ping' => $post->to_ping,
                    'pinged' => $post->pinged,
                    'post_modified' => $post->post_modified,
                    'post_modified_gmt' => $post->post_modified_gmt,
                    'post_parent' => $post->post_parent,
                    'menu_order' => $post->menu_order,
                    'post_mime_type' => $post->post_mime_type,
                    'guid' => $post->guid,
                    'import_id' => $post->import_id,
                    'post_category' => $post->post_category,
                    'tags_input' => $post->tags_input,
                    'tax_input' => $post->tax_input,
                    'meta_input' => $post->meta_input,
                    'page_template' => $post->page_template,
                ),
                true // wp_error
            ),
            'return' => 1
        ));

        $result = PostRepository::create($post);

        $this->assertEquals($result, 1);
        $this->assertConditionsMet();
    }

    function test_create_requires_no_id(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $post = PostFactory::create(['id'=>1]);
        WP_Mock::userFunction('wp_insert_post', array('times' => 0));
        PostRepository::create($post);
        $this->assertConditionsMet();
    }

    function test_create_throws_on_error(): void
    {
        $this->expectException(RuntimeException::class);
        $post = PostFactory::create();
        $error = $this->getMockBuilder('WP_Error')->getMock();
        WP_Mock::userFunction('is_wp_error', array(
            'times'=> 1,
            'args' => [$error],
            'return' => true,
        ));
        WP_Mock::userFunction('wp_insert_post', array(
            'times' => 1,
            'return' => $error
        ));
        PostRepository::create($post);
        $this->assertConditionsMet();
    }

    /**
     * test that we can do partial updates on a single resource
     * @return void
     */
    function test_update_resource(): void {
        WP_Mock::userFunction('is_wp_error', array(
            'times'=> 1,
            'args' => [1],
            'return' => false,
        ));
        $post = PostFactory::create(['id' => 1]);
        WP_Mock::userFunction('wp_update_post', array(
            'times' => 1,
            'args' => array(
                array(
                    'id' => $post->id,
                    'post_author' => $post->post_author,
                    'post_date' => $post->post_date,
                    'post_date_gmt' => $post->post_date_gmt,
                    'post_content' => $post->post_content,
                    'post_content_filtered' => $post->post_content_filtered,
                    'post_title' => $post->post_title,
                    'post_excerpt' => $post->post_excerpt,
                    'post_status' => $post->post_status,
                    'post_type' => $post->post_type,
                    'comment_status' => $post->comment_status,
                    'ping_status' => $post->ping_status,
                    'post_password' => $post->post_password,
                    'post_name' => $post->post_name,
                    'to_ping' => $post->to_ping,
                    'pinged' => $post->pinged,
                    'post_modified' => $post->post_modified,
                    'post_modified_gmt' => $post->post_modified_gmt,
                    'post_parent' => $post->post_parent,
                    'menu_order' => $post->menu_order,
                    'post_mime_type' => $post->post_mime_type,
                    'guid' => $post->guid,
                    'import_id' => $post->import_id,
                    'post_category' => $post->post_category,
                    'tags_input' => $post->tags_input,
                    'tax_input' => $post->tax_input,
                    'meta_input' => $post->meta_input,
                    'page_template' => $post->page_template,
                ),
                true // wp_error
            ),
            'return' => $post->id
        ));

        $this->assertEquals(PostRepository::update($post), $post->id);

        $this->assertConditionsMet();
    }

    function test_update_throws_on_error(): void
    {
        $this->expectException(RuntimeException::class);
        $post = PostFactory::create(['id' => 1]);
        $error = $this->getMockBuilder('WP_Error')->getMock();
        WP_Mock::userFunction('is_wp_error', array(
            'times'=> 1,
            'args' => [$error],
            'return' => true,
        ));
        WP_Mock::userFunction('wp_update_post', array(
            'times' => 1,
            'return' => $error
        ));
        PostRepository::update($post);
    }

    function test_update_requires_id(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $post = PostFactory::create();
        WP_Mock::userFunction('wp_update_post', array('times' => 0));
        PostRepository::update($post);
    }

    /**
     * test that we can delete a resource
     * @return void
     */
    function test_delete_resource(): void
    {
        $post = PostFactory::create(['id' => 1]);
        $wp_post = $this->getMockBuilder('WP_Post')->getMock();
        WP_Mock::userFunction('wp_delete_post', array('times' => 1, 'args' => [1, true], 'return' => $wp_post));
        PostRepository::delete($post->id);
        $this->assertConditionsMet();
    }

    function test_delete_requires_id(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $post = PostFactory::create();
        WP_Mock::userFunction('wp_delete_post', array('times' => 0));
        PostRepository::delete($post->id);
    }

    function test_delete_throws_on_error(): void
    {
        $this->expectException(RuntimeException::class);
        $post = PostFactory::create(['id' => 1]);
        WP_Mock::userFunction('wp_delete_post', array('times' => 1, 'return' => false));
        PostRepository::delete($post->id);
    }

    /**
     * test that we can get a single resource
     * @return void
     */
    function test_get_resource_returns_dto(): void
    {
        $this->fail('Not implemented');
    }

    function test_get_requires_id(): void
    {
        $this->fail('Not implemented');
    }

    function test_get_throws_on_error(): void
    {
        $this->fail('Not implemented');
    }

    /**
     * test that we can get all resources matching our criteria
     * @return void
     */
    function test_get_all_resources_returns_dtos(): void
    {
        $this->fail('Not implemented');
    }

    function test_get_all_requires_ids(): void
    {
        $this->fail('Not implemented');
    }

    function test_get_all_throws_on_error(): void
    {
        $this->fail('Not implemented');
    }
}
