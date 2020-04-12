'use strict';

import React from "react";
import * as THREE from 'three'
import {Button, Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import "antd/dist/antd.css";
import "./css/ThreeDemo.css";

var camera, scence, renderer;
var geometry, material, mesh;
var render_w, render_h;
var raycaster,mouse;

function init(){

    render_w = window.innerWidth;
    render_h = window.innerHeight;
    camera = new THREE.PerspectiveCamera(70, render_w / render_h, 0.01, 10);
    camera.position.z = 1;

    scence = new THREE.Scene();
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scence.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias : true });

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
}

function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scence, camera);
}

init();

class ThreeDemo extends React.Component{

    componentDidMount(){
        console.log('init. ');
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
        this.init();
    }

    componentDidUpdate(){
        console.log('update');
        render_w = this.refs.contnr.clientWidth;
        render_h = this.refs.contnr.clientHeight;
        camera.aspect = render_w / render_h;
        renderer.setSize(render_w, render_h);
    }

    componentWillUnmount() { 

        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    handleResize(){

        render_w = this.refs.contnr.clientWidth;
        render_h = this.refs.contnr.clientHeight;

        camera.aspect = render_w / render_h;
        camera.updateProjectionMatrix();
        renderer.setSize( render_w, render_h );
    }

    init(){
        render_w = this.refs.contnr.clientWidth;
        render_h = this.refs.contnr.clientHeight;
        camera.aspect = render_w / render_h;
        renderer.setSize(render_w, render_h);
        console.log('width height', render_w, render_h);

        this.refs.contnr.appendChild( renderer.domElement );
        // this.refs.contnr.addEventListener('mousemove', function(){
        //     event.preventDefault();
        //     mouse.x = (event.clientX / this.refs.contnr.clientWidth) * 2 - 1;
        //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // }, false);
        animate();
    }

    render(){

        return(
            <Layout>
                <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
                >
                <div className="logo" />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <UserOutlined />
                        subnav 1
                        </span>
                    }
                    >
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <UserOutlined />
                        subnav 2
                        </span>
                    }
                    >
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu
                    key="sub3"
                    title={
                        <span>
                        <UserOutlined />
                        subnav 3
                        </span>
                    }
                    >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0, height: '6vh' }} />
                    <Content style={{ margin: '16px 8px 0', overflow: 'initial' }}>
                        <div ref='contnr' className="site-layout-background" style={{ padding: 0, textAlign: 'center', height: 'calc(88vh - 16px)' }}>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', height: '6vh' }}>rhino ©2020 Created by max kot</Footer>
                </Layout>
            </Layout>
            );
    }
}

export default ThreeDemo;