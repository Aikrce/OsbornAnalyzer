#!/bin/bash

# 奥斯本分析器部署脚本
# 使用方法: ./scripts/deploy.sh [环境]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查环境
check_environment() {
    log_info "检查部署环境..."
    
    # 检查Node.js版本
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        log_error "Node.js 版本过低，需要 18+ 版本"
        exit 1
    fi
    
    log_success "Node.js 版本检查通过: $(node --version)"
    
    # 检查npm
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装"
        exit 1
    fi
    
    log_success "npm 版本: $(npm --version)"
}

# 安装依赖
install_dependencies() {
    log_info "安装项目依赖..."
    
    # 安装根目录依赖
    npm install
    
    # 安装web应用依赖
    cd apps/web
    npm install
    cd ../..
    
    log_success "依赖安装完成"
}

# 运行测试
run_tests() {
    log_info "运行测试..."
    
    cd apps/web
    
    # 类型检查
    log_info "运行类型检查..."
    npm run type-check
    
    # 代码检查
    log_info "运行代码检查..."
    npm run lint
    
    # 运行测试
    log_info "运行单元测试..."
    npm run test -- --run
    
    cd ../..
    
    log_success "所有测试通过"
}

# 构建项目
build_project() {
    log_info "构建项目..."
    
    cd apps/web
    
    # 清理之前的构建
    if [ -d "dist" ]; then
        log_info "清理之前的构建文件..."
        rm -rf dist
    fi
    
    # 构建项目
    log_info "开始构建..."
    npm run build
    
    # 检查构建结果
    if [ ! -d "dist" ]; then
        log_error "构建失败，dist目录不存在"
        exit 1
    fi
    
    cd ../..
    
    log_success "项目构建完成"
}

# 部署到本地
deploy_local() {
    log_info "部署到本地服务器..."
    
    cd apps/web
    
    # 启动预览服务器
    log_info "启动预览服务器..."
    log_success "应用已启动，访问: http://localhost:4173"
    
    npm run preview
}

# 部署到生产环境
deploy_production() {
    log_info "部署到生产环境..."
    
    # 检查环境变量
    if [ -z "$DEPLOY_TARGET" ]; then
        log_error "请设置 DEPLOY_TARGET 环境变量"
        exit 1
    fi
    
    cd apps/web
    
    # 创建部署包
    log_info "创建部署包..."
    tar -czf ../osborn-analyzer-$(date +%Y%m%d-%H%M%S).tar.gz dist/
    
    log_success "部署包已创建"
    
    # 这里可以添加具体的部署逻辑
    # 例如：上传到服务器、部署到CDN等
    
    cd ../..
}

# 显示帮助信息
show_help() {
    echo "奥斯本分析器部署脚本"
    echo ""
    echo "使用方法:"
    echo "  $0 [选项]"
    echo ""
    echo "选项:"
    echo "  local       部署到本地预览服务器"
    echo "  production  部署到生产环境"
    echo "  build       仅构建项目"
    echo "  test        仅运行测试"
    echo "  help        显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 local      # 本地部署"
    echo "  $0 build      # 仅构建"
    echo "  $0 test       # 仅测试"
}

# 主函数
main() {
    local command=${1:-help}
    
    case $command in
        "local")
            check_environment
            install_dependencies
            run_tests
            build_project
            deploy_local
            ;;
        "production")
            check_environment
            install_dependencies
            run_tests
            build_project
            deploy_production
            ;;
        "build")
            check_environment
            install_dependencies
            build_project
            ;;
        "test")
            check_environment
            install_dependencies
            run_tests
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"
