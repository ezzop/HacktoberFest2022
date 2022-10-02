package java_app;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;
import javax.swing.JOptionPane;

public class VaccinatedvController implements Initializable {

    @FXML
    private Button btn_click_me;

    @FXML
    private Button btn_logout;

    Connection con = null;
    ResultSet rs = null;
    PreparedStatement ps = null;
    public String x, dose1, dose2, date1, vaccine1, date2, vaccine2;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
    }

    @FXML
    private void Logout(ActionEvent event) throws Exception {
        try {
            JOptionPane.showMessageDialog(null, "Logout Successful");
            btn_logout.getScene().getWindow().hide();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("FXML.fxml"));
            Parent root = loader.load();
            Stage mainstage = new Stage();
            Scene scene = new Scene(root);
            mainstage.setScene(scene);
            mainstage.show();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }

    @FXML
    private void Vaccinated_A(ActionEvent event) throws Exception {
        con = mysqlconnect.Connectdb();
        boolean st = false;
        try {
            ps = con.prepareStatement("select * from register where email=?");
            ps.setString(1, x);
            rs = ps.executeQuery();
            st = rs.next();
            if (st) {
                dose1 = rs.getString(2);
                date1 = rs.getString(3);
                vaccine1 = rs.getString(4);
                dose2 = rs.getString(5);
                date2 = rs.getString(6);
                vaccine2 = rs.getString(7);
                ps = con.prepareStatement("insert into vaccinated (email,dose1,date1,vaccine1,dose2,date2,vaccine2) values(?,?,?,?,?,?,?)");
                ps.setString(1, x);
                ps.setString(2, dose1);
                ps.setString(3, date1);
                ps.setString(4, vaccine1);
                ps.setString(5, dose2);
                ps.setString(6, date2);
                ps.setString(7, vaccine2);
                int i = ps.executeUpdate();
                if (i > 0) {
                    JOptionPane.showMessageDialog(null, "Verification successful");
                    ps = con.prepareStatement("DELETE FROM register where email=?");
                    ps.setString(1, x);
                    int pp = ps.executeUpdate();
                    btn_click_me.getScene().getWindow().hide();
                    FXMLLoader loader = new FXMLLoader(getClass().getResource("Homepage.fxml"));
                    Parent root = loader.load();
                    HomepageController homepagecontroller = loader.getController();
                    homepagecontroller.transferMessage(x);
                    Stage mainstage = new Stage();
                    Scene scene = new Scene(root);
                    mainstage.setScene(scene);
                    mainstage.show();
                } else {
                    JOptionPane.showMessageDialog(null, "User already exists");
                }
            } else {
                JOptionPane.showMessageDialog(null, "Please, take both doses first", "Warning", JOptionPane.ERROR_MESSAGE);
                btn_click_me.getScene().getWindow().hide();
                FXMLLoader loader = new FXMLLoader(getClass().getResource("Homepage.fxml"));
                Parent root = loader.load();
                HomepageController homepagecontroller = loader.getController();
                homepagecontroller.transferMessage(x);
                Stage mainstage = new Stage();
                Scene scene = new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "Please, take both doses first", "Warning", JOptionPane.ERROR_MESSAGE);
            btn_click_me.getScene().getWindow().hide();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("Homepage.fxml"));
            Parent root = loader.load();
            HomepageController homepagecontroller = loader.getController();
            homepagecontroller.transferMessage(x);
            Stage mainstage = new Stage();
            Scene scene = new Scene(root);
            mainstage.setScene(scene);
            mainstage.show();
        }
    }

    void transferMessage(String x) {
        this.x = x;

    }

}
